from tokenizer.tokenizer import Tokenizer


def main():
    print("=" * 50)
    print("TESTE DO TOKENIZADOR HÍBRIDO")
    print("=" * 50)

    textos = [
        "Olá mundo",
        "Eu gosto de programar",
        "Python é uma linguagem",
        "Java também é uma linguagem",
        "def somar(a, b):\n    return a + b",
        "function somar(a, b) {\n    return a + b;\n}",
    ]

    tokenizer = Tokenizer()

    print("\nConstruindo vocabulário...")

    tokenizer.build_vocabulary(textos)

    print(
        "Tamanho do vocabulário:",
        tokenizer.vocab_size(),
    )

    # -------------------------------------------------
    # TESTE DE TEXTO
    # -------------------------------------------------

    texto = "Olá mundo"

    print("\nTexto:")
    print(texto)

    ids_texto = tokenizer.encode(
        texto,
        add_bos=True,
        add_eos=True,
    )

    print("\nIDs do texto:")
    print(ids_texto)

    texto_decodificado = tokenizer.decode(
        ids_texto
    )

    print("\nTexto decodificado:")
    print(texto_decodificado)

    assert "Olá" in texto_decodificado
    assert "mundo" in texto_decodificado

    # -------------------------------------------------
    # TESTE DE CÓDIGO
    # -------------------------------------------------

    codigo = """def somar(a, b):
    return a + b"""

    print("\nCódigo original:")
    print(codigo)

    tokens_codigo = tokenizer._split_text(codigo)

    print("\nTokens do código:")
    print(tokens_codigo)

    ids_codigo = tokenizer.encode(codigo)

    print("\nIDs do código:")
    print(ids_codigo)

    codigo_decodificado = tokenizer.decode(
        ids_codigo
    )

    print("\nCódigo decodificado:")
    print(codigo_decodificado)

    # Verifica tokens importantes
    assert "def" in tokens_codigo
    assert "somar" in tokens_codigo
    assert "(" in tokens_codigo
    assert ")" in tokens_codigo
    assert ":" in tokens_codigo
    assert "return" in tokens_codigo
    assert "+" in tokens_codigo

    # Verifica estrutura
    assert "<NL>" in tokens_codigo
    assert "<INDENT>" in tokens_codigo

    # Verifica reconstrução
    assert "def somar(a, b):" in codigo_decodificado
    assert "return a + b" in codigo_decodificado

    # -------------------------------------------------
    # TESTE DE PALAVRAS COM ACENTOS
    # -------------------------------------------------

    texto_unicode = "Python é uma linguagem também"

    tokens_unicode = tokenizer._split_text(
        texto_unicode
    )

    print("\nTokens Unicode:")
    print(tokens_unicode)

    assert "é" in tokens_unicode
    assert "também" in tokens_unicode

    # -------------------------------------------------
    # TESTE DE PALAVRA DESCONHECIDA
    # -------------------------------------------------

    print("\nTeste de palavra desconhecida:")

    ids_desconhecidos = tokenizer.encode(
        "Eu gosto de Rust"
    )

    print(ids_desconhecidos)

    assert tokenizer.token_to_id["<UNK>"] in ids_desconhecidos

    print("\n" + "=" * 50)
    print("TODOS OS TESTES DO TOKENIZADOR PASSARAM!")
    print("=" * 50)


if __name__ == "__main__":
    main()