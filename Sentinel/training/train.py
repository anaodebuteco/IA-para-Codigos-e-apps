import json

import torch

from torch.utils.data import DataLoader

from model.transformer import Transformer

from tokenizer.tokenizer import Tokenizer

from training.dataset import TextDataset

from training.loss import calcular_perda


def carregar_dataset(caminho):

    with open(caminho, "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    if "examples" in dados:
        return [
            exemplo["content"]
            for exemplo in dados["examples"]
        ]

    return dados["texts"]


def main():

    print("=" * 50)

    print("TREINAMENTO V3 DO MODELO")

    print("=" * 50)

    caminho_dataset = "data/v3/dataset.json"

    textos = carregar_dataset(caminho_dataset)

    print("\nDataset:")

    print(caminho_dataset)

    print("\nExemplos:")

    print(len(textos))

    tokenizer = Tokenizer()

    tokenizer.build_vocabulary(textos)

    print("\nVocabulário:")

    print(tokenizer.vocab_size())

    sequence_length = 8

    dataset = TextDataset(
        texts=textos,
        tokenizer=tokenizer,
        sequence_length=sequence_length,
    )

    print("\nSequências:")

    print(len(dataset))

    batch_size = 4

    dataloader = DataLoader(
        dataset,
        batch_size=batch_size,
        shuffle=True,
    )

    print("\nMini-batches por época:")

    print(len(dataloader))

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

    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=0.001,
    )

    model.train()

    epochs = 10

    for epoch in range(epochs):

        perda_total = 0.0

        for input_ids, target_ids in dataloader:

            optimizer.zero_grad()

            logits = model(input_ids)

            perda = calcular_perda(
                logits,
                target_ids,
            )

            perda.backward()

            optimizer.step()

            perda_total += perda.item()

        perda_media = perda_total / len(dataloader)

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

    print("TREINAMENTO V3 CONCLUÍDO!")

    print("=" * 50)


if __name__ == "__main__":

    main()