import torch

from model.attention import SelfAttention


def main():
    torch.manual_seed(42)

    x = torch.randn(1, 4, 16)

    attention = SelfAttention(d_model=16)

    output = attention(x)

    print("Entrada:", x.shape)
    print("Saída:", output.shape)

    print("\nPesos de atenção:")
    print(attention.last_attention_weights[0])

    print("\nParte futura da atenção:")

    weights = attention.last_attention_weights[0]

    for i in range(weights.size(0)):
        future = weights[i, i + 1:]

        print(
            f"Token {i}:",
            future.tolist()
        )


if __name__ == "__main__":
    main()