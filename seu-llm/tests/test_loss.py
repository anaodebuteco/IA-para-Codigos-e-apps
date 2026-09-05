import torch

from training.loss import calcular_perda


def main():
    print("=" * 50)
    print("TESTE DA FUNÇÃO DE PERDA")
    print("=" * 50)

    batch_size = 2
    sequence_length = 4
    vocab_size = 10

    # Simula as previsões do Transformer.
    logits = torch.randn(
        batch_size,
        sequence_length,
        vocab_size,
    )

    # Simula os tokens corretos.
    targets = torch.randint(
        0,
        vocab_size,
        (
            batch_size,
            sequence_length,
        ),
    )

    print("\nFormato dos logits:")
    print(logits.shape)

    print("\nFormato dos alvos:")
    print(targets.shape)

    perda = calcular_perda(
        logits,
        targets,
    )

    print("\nPerda:")
    print(perda.item())

    # A perda deve ser um único número.
    assert perda.ndim == 0

    # A perda precisa ser finita.
    assert torch.isfinite(perda)

    # A perda precisa permitir backpropagation.
    logits.requires_grad_(True)

    perda = calcular_perda(
        logits,
        targets,
    )

    perda.backward()

    assert logits.grad is not None
    assert torch.isfinite(logits.grad).all()

    print("\nGradientes calculados corretamente.")

    print("\n" + "=" * 50)
    print("TODOS OS TESTES DA FUNÇÃO DE PERDA PASSARAM!")
    print("=" * 50)


if __name__ == "__main__":
    main()