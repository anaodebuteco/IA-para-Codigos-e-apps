import torch

from model.transformer import Transformer
from tokenizer.tokenizer import Tokenizer


def carregar_modelo(caminho="modelo_treinado.pt"):
    checkpoint = torch.load(
        caminho,
        map_location="cpu",
    )

    tokenizer = Tokenizer()

    tokenizer.token_to_id = checkpoint["token_to_id"]
    tokenizer.id_to_token = checkpoint["id_to_token"]

    config = checkpoint["config"]

    model = Transformer(
        vocab_size=len(tokenizer.token_to_id),
        d_model=config["d_model"],
        num_layers=config["num_layers"],
        num_heads=config["num_heads"],
        hidden_dim=config["hidden_dim"],
        max_seq_len=config["max_seq_len"],
        dropout=0.0,
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    model.eval()

    return model, tokenizer


def prever_proximo_token(
    model,
    tokenizer,
    texto,
):
    token_ids = tokenizer.encode(texto)

    if not token_ids:
        raise ValueError(
            "O texto de entrada não gerou nenhum token."
        )

    # O Transformer suporta no máximo 8 tokens.
    token_ids = token_ids[-model.max_seq_len:]

    input_ids = torch.tensor(
        [token_ids],
        dtype=torch.long,
    )

    with torch.no_grad():
        logits = model(input_ids)

    # Pegamos a previsão correspondente ao último token.
    ultimo_logits = logits[0, -1]

    proximo_token_id = torch.argmax(
        ultimo_logits
    ).item()

    proximo_token = tokenizer.id_to_token.get(
        proximo_token_id,
        "<UNK>",
    )

    return proximo_token


def main():
    print("=" * 50)
    print("TESTE DE INFERÊNCIA - SENTINEL V2")
    print("=" * 50)

    model, tokenizer = carregar_modelo()

    print("\nModelo carregado!")
    print(
        f"Vocabulário: {len(tokenizer.token_to_id)}"
    )

    testes = [
        "Eu gosto de",
        "Python é uma",
        "Programar é",
        "Java é uma",
    ]

    print("\nPrevisões:")

    for texto in testes:
        proximo_token = prever_proximo_token(
            model,
            tokenizer,
            texto,
        )

        print(
            f'Entrada: "{texto}"'
        )
        print(
            f"Próximo token: {proximo_token}"
        )
        print("-" * 30)

    print("\n" + "=" * 50)
    print("TESTE CONCLUÍDO!")
    print("=" * 50)


if __name__ == "__main__":
    main()