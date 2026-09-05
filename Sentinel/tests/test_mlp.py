import torch

from model.mlp import MLP


def main():
    torch.manual_seed(42)

    x = torch.randn(2, 4, 16)

    mlp = MLP(
        d_model=16,
        hidden_dim=64,
    )

    output = mlp(x)

    print("Entrada:", x.shape)
    print("Saída:", output.shape)


if __name__ == "__main__":
    main()