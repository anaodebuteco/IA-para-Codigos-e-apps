import torch

from model.transformer import Transformer


def criar_modelo():
    return Transformer(
        vocab_size=1000,
        d_model=128,
        num_layers=4,
        num_heads=4,
        hidden_dim=512,
        max_seq_len=256,
        dropout=0.0,
    )


def testar_saida():
    print("\n[1] Testando formato da saída...")

    model = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (2, 16),
    )

    output = model(input_ids)

    assert output.shape == (2, 16, 1000)

    print("OK")
    print("Entrada:", input_ids.shape)
    print("Saída:", output.shape)


def testar_multiplas_cabecas():
    print("\n[2] Testando múltiplas cabeças...")

    model = criar_modelo()

    attention = model.blocks[0].attention

    assert attention.num_heads == 4
    assert attention.head_dim == 32

    print("OK")
    print("Cabeças:", attention.num_heads)
    print("Dimensão por cabeça:", attention.head_dim)


def testar_contexto_maximo():
    print("\n[3] Testando contexto máximo...")

    model = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (1, 256),
    )

    output = model(input_ids)

    assert output.shape == (1, 256, 1000)

    print("OK")
    print("Sequência:", input_ids.shape)


def testar_contexto_excedido():
    print("\n[4] Testando sequência maior que o contexto...")

    model = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (1, 257),
    )

    try:
        model(input_ids)

        raise AssertionError(
            "O modelo deveria rejeitar uma sequência maior que o contexto."
        )

    except ValueError:
        print("OK")
        print("O modelo rejeitou corretamente a sequência.")


def testar_tamanhos_de_lote():
    print("\n[5] Testando diferentes tamanhos de lote...")

    model = criar_modelo()

    for batch_size in [1, 2, 4]:

        input_ids = torch.randint(
            0,
            1000,
            (batch_size, 16),
        )

        output = model(input_ids)

        assert output.shape == (
            batch_size,
            16,
            1000,
        )

        print(
            f"OK - lote {batch_size}:",
            output.shape,
        )


def testar_gradientes():
    print("\n[6] Testando gradientes...")

    model = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (2, 16),
    )

    output = model(input_ids)

    loss = output.mean()

    loss.backward()

    encontrou_gradiente = False

    for parametro in model.parameters():

        if parametro.grad is not None:

            encontrou_gradiente = True

            assert torch.isfinite(
                parametro.grad
            ).all()

    assert encontrou_gradiente

    print("OK")
    print("Gradientes calculados corretamente.")


def testar_nan_inf():
    print("\n[7] Testando NaN e infinito...")

    model = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (2, 16),
    )

    output = model(input_ids)

    assert torch.isfinite(output).all()

    print("OK")
    print("Nenhum NaN ou infinito encontrado.")


def testar_determinismo():
    print("\n[8] Testando determinismo...")

    torch.manual_seed(42)
    model1 = criar_modelo()

    torch.manual_seed(42)
    model2 = criar_modelo()

    input_ids = torch.randint(
        0,
        1000,
        (2, 16),
    )

    output1 = model1(input_ids)
    output2 = model2(input_ids)

    assert torch.allclose(
        output1,
        output2,
    )

    print("OK")
    print("Modelos reproduziram a mesma saída.")


def main():
    print("=" * 50)
    print("TESTES COMPLETOS DO TRANSFORMER")
    print("=" * 50)

    testar_saida()
    testar_multiplas_cabecas()
    testar_contexto_maximo()
    testar_contexto_excedido()
    testar_tamanhos_de_lote()
    testar_gradientes()
    testar_nan_inf()
    testar_determinismo()

    print("\n" + "=" * 50)
    print("TODOS OS TESTES PASSARAM!")
    print("=" * 50)


if __name__ == "__main__":
    main()