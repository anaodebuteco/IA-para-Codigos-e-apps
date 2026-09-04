import math

import torch
import torch.nn as nn


class SelfAttention(nn.Module):
    def __init__(self, d_model: int, dropout: float = 0.0):
        super().__init__()

        self.d_model = d_model

        # Projeções para Query, Key e Value
        self.query = nn.Linear(d_model, d_model)
        self.key = nn.Linear(d_model, d_model)
        self.value = nn.Linear(d_model, d_model)

        # Dropout aplicado aos pesos de atenção
        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x possui o formato:
        # (batch_size, sequence_length, d_model)

        # Criamos Query, Key e Value
        Q = self.query(x)
        K = self.key(x)
        V = self.value(x)

        # Calculamos a similaridade entre Query e Key
        scores = Q @ K.transpose(-2, -1)

        # Escalonamos os scores
        scores = scores / math.sqrt(self.d_model)

        # Criamos a máscara causal
        sequence_length = x.size(1)

        mask = torch.tril(
            torch.ones(
                sequence_length,
                sequence_length,
                device=x.device,
                dtype=torch.bool,
            )
        )

        # Bloqueamos os tokens futuros
        scores = scores.masked_fill(~mask, float("-inf"))

        # Transformamos os scores em probabilidades
        attention_weights = torch.softmax(scores, dim=-1)
        self.last_attention_weights = attention_weights.detach()
        # Aplicamos dropout
        attention_weights = self.dropout(attention_weights)

        # Combinamos os Values usando os pesos de atenção
        output = attention_weights @ V

        return output