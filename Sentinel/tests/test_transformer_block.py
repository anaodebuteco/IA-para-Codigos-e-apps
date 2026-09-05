import torch

from model.transformer_block import TransformerBlock


def main():
    torch.manual_seed(42)

    x = torch.randn(2, 4, 16)

    block = TransformerBlock(
        d_model=16,
        hidden_dim=64,
    )

    output = block(x)

    print("Entrada:", x.shape)
    print("Saída:", output.shape)

    difference = torch.mean(torch.abs(output - x))

    print("Diferença média:", difference.item())


if __name__ == "__main__":
    main()