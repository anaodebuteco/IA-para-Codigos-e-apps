import torch

from tokenizer.tokenizer import Tokenizer
from training.dataset import TextDataset


def main():
    print("=" * 50)
    print("TESTE DO DATASET")
    print("=" * 50)

    textos = [
        "Eu gosto de Python",
        "Python é uma linguagem",
        "Eu gosto de programar",
    ]

    tokenizer = Tokenizer()

    tokenizer.build_vocabulary(textos)

    sequence_length = 4

    dataset = TextDataset(
        texts=textos,
        tokenizer=tokenizer,
        sequence_length=sequence_length,
    )

    print("\nTamanho do vocabulário:")
    print(tokenizer.vocab_size())

    print("\nQuantidade de sequências:")
    print(len(dataset))

    assert len(dataset) > 0

    input_ids, target_ids = dataset[0]

    print("\nPrimeira entrada:")
    print(input_ids)

    print("\nPrimeiro alvo:")
    print(target_ids)

    # Verifica dimensões.
    assert input_ids.shape == (
        sequence_length,
    )

    assert target_ids.shape == (
        sequence_length,
    )

    # O alvo precisa ser a entrada deslocada
    # exatamente um token para frente.
    assert torch.equal(
        input_ids[1:],
        target_ids[:-1],
    )

    print("\nEntrada decodificada:")
    print(tokenizer.decode(input_ids.tolist()))

    print("\nAlvo decodificado:")
    print(tokenizer.decode(target_ids.tolist()))

    print("\n" + "=" * 50)
    print("TODOS OS TESTES DO DATASET PASSARAM!")
    print("=" * 50)


if __name__ == "__main__":
    main()