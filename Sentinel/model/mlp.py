import torch
import torch.nn as nn


class MLP(nn.Module):
    def __init__(
        self,
        d_model: int,
        hidden_dim: int,
        dropout: float = 0.0,
    ):
        super().__init__()

        self.fc1 = nn.Linear(d_model, hidden_dim)
        self.activation = nn.GELU()
        self.fc2 = nn.Linear(hidden_dim, d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.fc1(x)
        x = self.activation(x)
        x = self.fc2(x)
        x = self.dropout(x)

        return x