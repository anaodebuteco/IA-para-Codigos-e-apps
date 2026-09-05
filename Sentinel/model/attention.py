import torch
import torch.nn as nn
import torch.nn.functional as F


class SelfAttention(nn.Module):
    def __init__(
        self,
        d_model: int,
        num_heads: int,
        dropout: float = 0.0,
    ):
        super().__init__()

        if d_model % num_heads != 0:
            raise ValueError(
                "d_model precisa ser divisível por num_heads."
            )

        self.d_model = d_model
        self.num_heads = num_heads
        self.head_dim = d_model // num_heads

        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)

        self.out_proj = nn.Linear(d_model, d_model)

        self.dropout = nn.Dropout(dropout)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        batch_size, seq_len, _ = x.shape

        # Projeta entrada para Query, Key e Value
        q = self.q_proj(x)
        k = self.k_proj(x)
        v = self.v_proj(x)

        # Divide em múltiplas cabeças
        q = q.view(
            batch_size,
            seq_len,
            self.num_heads,
            self.head_dim,
        ).transpose(1, 2)

        k = k.view(
            batch_size,
            seq_len,
            self.num_heads,
            self.head_dim,
        ).transpose(1, 2)

        v = v.view(
            batch_size,
            seq_len,
            self.num_heads,
            self.head_dim,
        ).transpose(1, 2)

        # Calcula os scores de atenção
        scores = torch.matmul(
            q,
            k.transpose(-2, -1),
        )

        scores = scores / (self.head_dim ** 0.5)

        # Máscara causal:
        # cada token só pode olhar para ele mesmo
        # e para os tokens anteriores.
        causal_mask = torch.tril(
            torch.ones(
                seq_len,
                seq_len,
                device=x.device,
                dtype=torch.bool,
            )
        )

        scores = scores.masked_fill(
            ~causal_mask,
            float("-inf"),
        )

        # Converte scores em probabilidades
        attention_weights = F.softmax(
            scores,
            dim=-1,
        )

        attention_weights = self.dropout(
            attention_weights
        )

        # Combina os Values
        attention_output = torch.matmul(
            attention_weights,
            v,
        )

        # Junta novamente as cabeças
        attention_output = attention_output.transpose(
            1,
            2,
        ).contiguous()

        attention_output = attention_output.view(
            batch_size,
            seq_len,
            self.d_model,
        )

        # Projeção final
        output = self.out_proj(
            attention_output
        )

        return output