from tokenizer.tokenizer import Tokenizer


def main():
    print("=" * 50)
    print("TESTE DO TOKENIZADOR")
    print("=" * 50)

    textos = [
        "Olá mundo",
        "Eu gosto de programar",
        "Python é uma linguagem",
        "Java também é uma linguagem",
    ]

    tokenizer = Tokenizer()

    print("\nConstruindo vocabulário...")

    tokenizer.build_vocabulary(textos)

    print(
        "Tamanho do vocabulário:",
        tokenizer.vocab_size(),
    )

    texto = "Eu gosto de Python"

    print("\nTexto original:")
    print(texto)

    ids = tokenizer.encode(
        texto,
        add_bos=True,
        add_eos=True,
    )

    print("\nIDs:")
    print(ids)

    texto_decodificado = tokenizer.decode(ids)

    print("\nTexto decodificado:")
    print(texto_decodificado)

    print("\nTeste de palavra desconhecida:")

    ids_desconhecidos = tokenizer.encode(
        "Eu gosto de Rust",
    )

    print(ids_desconhecidos)

    assert ids[0] == tokenizer.token_to_id["<BOS>"]
    assert ids[-1] == tokenizer.token_to_id["<EOS>"]

    assert tokenizer.token_to_id["<UNK>"] in ids_desconhecidos

    print("\n" + "=" * 50)
    print("TESTE DO TOKENIZADOR PASSOU!")
    print("=" * 50)


if __name__ == "__main__":
    main()