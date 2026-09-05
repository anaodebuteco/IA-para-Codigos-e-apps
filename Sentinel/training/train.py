import torch

from model.transformer import Transformer
from tokenizer.tokenizer import Tokenizer
from training.dataset import TextDataset
from training.loss import calcular_perda


def main():
    print("=" * 50)
    print("PRIMEIRO TREINAMENTO DO MODELO")
    print("=" * 50)

    # -----------------------------------------
    # Dados
    # -----------------------------------------

    textos = [
        "Eu gosto de Python",
        "Python é uma linguagem",
        "Eu gosto de programar",
        "Programar é divertido",
        "Java é uma linguagem",
        "JavaScript é usado na web",
    ]

    # -----------------------------------------
    # Tokenizador
    # -----------------------------------------

    tokenizer = Tokenizer()

    tokenizer.build_vocabulary(textos)

    print("\nVocabulário:")
    print(tokenizer.vocab_size())

    # -----------------------------------------
    # Dataset
    # -----------------------------------------

    sequence_length = 8

    dataset = TextDataset(
        texts=textos,
        tokenizer=tokenizer,
        sequence_length=sequence_length,
    )

    print("\nSequências:")
    print(len(dataset))

    # -----------------------------------------
    # Modelo
    # -----------------------------------------

    model = Transformer(
        vocab_size=tokenizer.vocab_size(),
        d_model=128,
        num_layers=4,
        num_heads=4,
        hidden_dim=512,
        max_seq_len=sequence_length,
        dropout=0.0,
    )

    print("\nParâmetros:")
    print(
        sum(
            parametro.numel()
            for parametro in model.parameters()
        )
    )

    # -----------------------------------------
    # Otimizador
    # -----------------------------------------

    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=0.001,
    )

    # -----------------------------------------
    # Treinamento
    # -----------------------------------------

    model.train()

    epochs = 10

    for epoch in range(epochs):
        perda_total = 0.0

        for index in range(len(dataset)):
            input_ids, target_ids = dataset[index]

            # Adiciona dimensão do lote.
            input_ids = input_ids.unsqueeze(0)
            target_ids = target_ids.unsqueeze(0)

            optimizer.zero_grad()

            logits = model(input_ids)

            perda = calcular_perda(
                logits,
                target_ids,
            )

            perda.backward()

            optimizer.step()

            perda_total += perda.item()

        perda_media = perda_total / len(dataset)

        print(
            f"Época {epoch + 1}/{epochs} "
            f"- perda: {perda_media:.4f}"
        )
    torch.save(
        {
            "model_state_dict": model.state_dict(),
            "token_to_id": tokenizer.token_to_id,
            "id_to_token": tokenizer.id_to_token,
            "config": {
                "d_model": 128,
                "num_layers": 4,
                "num_heads": 4,
                "hidden_dim": 512,
                "max_seq_len": sequence_length,
            },
        },
        "modelo_treinado.pt",
    )

    print("\nModelo salvo em:")
    print("modelo_treinado.pt")
    print("\n" + "=" * 50)
    print("TREINAMENTO CONCLUÍDO!")
    print("=" * 50)


if __name__ == "__main__":
    main()