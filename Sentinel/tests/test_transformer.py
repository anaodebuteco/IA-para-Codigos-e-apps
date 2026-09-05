import torch

from model.transformer import Transformer


def main():
    torch.manual_seed(42)

    vocab_size = 1000
    d_model = 128
    num_layers = 4
    num_heads = 4
    hidden_dim = 512
    max_seq_len = 256

    model = Transformer(
        vocab_size=vocab_size,
        d_model=d_model,
        num_layers=num_layers,
        num_heads=num_heads,
        hidden_dim=hidden_dim,
        max_seq_len=max_seq_len,
    )

    input_ids = torch.randint(
        0,
        vocab_size,
        (2, 16),
    )

    output = model(input_ids)

    print("Entrada:", input_ids.shape)
    print("Saída:", output.shape)
    print(
        "Parâmetros:",
        sum(p.numel() for p in model.parameters())
    )


if __name__ == "__main__":
    main()