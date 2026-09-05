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
    )

    model.load_state_dict(
        checkpoint["model_state_dict"]
    )

    model.eval()

    return model, tokenizer


def gerar_texto(
    model,
    tokenizer,
    prompt,
    max_new_tokens=10,
):
    input_ids = tokenizer.encode(prompt)

    generated_ids = list(input_ids)

    for _ in range(max_new_tokens):
        contexto = generated_ids[
            -model.max_seq_len:
        ]

        input_tensor = torch.tensor(
            [contexto],
            dtype=torch.long,
        )

        with torch.no_grad():
            logits = model(input_tensor)

        proximo_token_logits = logits[
            0,
            -1,
        ]

        proximo_token_id = torch.argmax(
            proximo_token_logits
        ).item()

        generated_ids.append(
            proximo_token_id
        )

        if (
            proximo_token_id
            == tokenizer.token_to_id["<EOS>"]
        ):
            break

    return tokenizer.decode(generated_ids)


def main():
    print("=" * 50)
    print("GERAÇÃO DE TEXTO")
    print("=" * 50)

    model, tokenizer = carregar_modelo()

    print("\nModelo carregado.")
    print(
        "Vocabulário:",
        tokenizer.vocab_size(),
    )

    print(
        "Contexto máximo:",
        model.max_seq_len,
    )

    prompts = [
        "Eu gosto de",
        "Python é",
        "Java é",
    ]

    for prompt in prompts:
        print("\n" + "-" * 50)
        print("Prompt:")
        print(prompt)

        resultado = gerar_texto(
            model,
            tokenizer,
            prompt,
            max_new_tokens=5,
        )

        print("\nGeração:")
        print(resultado)

    print("\n" + "=" * 50)
    print("GERAÇÃO CONCLUÍDA!")
    print("=" * 50)


if __name__ == "__main__":
    main()