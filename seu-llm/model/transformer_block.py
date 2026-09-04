import torch
import torch.nn as nn

from model.attention import SelfAttention
from model.mlp import MLP


class TransformerBlock(nn.Module):
    def __init__(
        self,
        d_model: int,
        hidden_dim: int,
        dropout: float = 0.0,
    ):
        super().__init__()

        self.norm1 = nn.LayerNorm(d_model)

        self.attention = SelfAttention(
            d_model=d_model,
            dropout=dropout,
        )

        self.norm2 = nn.LayerNorm(d_model)

        self.mlp = MLP(
            d_model=d_model,
            hidden_dim=hidden_dim,
            dropout=dropout,
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Self-Attention + conexão residual
        x = x + self.attention(self.norm1(x))

        # MLP + conexão residual
        x = x + self.mlp(self.norm2(x))

        return x
    