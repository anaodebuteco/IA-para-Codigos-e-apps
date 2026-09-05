import torch
import torch.nn.functional as F


def calcular_perda(
    logits: torch.Tensor,
    targets: torch.Tensor,
) -> torch.Tensor:
    """
    Calcula a Cross Entropy para previsão
    do próximo token.

    logits:
        [batch_size, sequence_length, vocab_size]

    targets:
        [batch_size, sequence_length]
    """

    batch_size, sequence_length, vocab_size = logits.shape

    logits = logits.reshape(
        batch_size * sequence_length,
        vocab_size,
    )

    targets = targets.reshape(
        batch_size * sequence_length,
    )

    perda = F.cross_entropy(
        logits,
        targets,
    )

    return perda