import torch
import torch.nn as nn

from model.transformer_block import TransformerBlock


class Transformer(nn.Module):
    def __init__(
        self,
        vocab_size: int,
        d_model: int,
        num_layers: int,
        num_heads: int,
        hidden_dim: int,
        max_seq_len: int,
        dropout: float = 0.0,
    ):
        super().__init__()

        if d_model % num_heads != 0:
            raise ValueError(
                "d_model precisa ser divisível por num_heads."
            )

        self.d_model = d_model
        self.max_seq_len = max_seq_len

        # Representação dos tokens
        self.token_embedding = nn.Embedding(
            vocab_size,
            d_model,
        )

        # Representação da posição dos tokens
        self.position_embedding = nn.Embedding(
            max_seq_len,
            d_model,
        )

        # Blocos Transformer
        self.blocks = nn.ModuleList(
            [
                TransformerBlock(
                    d_model=d_model,
                    hidden_dim=hidden_dim,
                    num_heads=num_heads,
                    dropout=dropout,
                )
                for _ in range(num_layers)
            ]
        )

        # Normalização final
        self.final_norm = nn.LayerNorm(d_model)

        # Converte a representação em logits do vocabulário
        self.output_head = nn.Linear(
            d_model,
            vocab_size,
            bias=False,
        )

    def forward(self, input_ids: torch.Tensor) -> torch.Tensor:
        batch_size, seq_len = input_ids.shape

        if seq_len > self.max_seq_len:
            raise ValueError(
                f"A sequência ({seq_len}) é maior que "
                f"o contexto máximo ({self.max_seq_len})."
            )

        # IDs das posições: 0, 1, 2, ..., seq_len - 1
        positions = torch.arange(
            seq_len,
            device=input_ids.device,
        )

        # Embeddings
        token_embeddings = self.token_embedding(input_ids)
        position_embeddings = self.position_embedding(positions)

        # Combina token + posição
        x = token_embeddings + position_embeddings

        # Passa pelos blocos Transformer
        for block in self.blocks:
            x = block(x)

        # Normalização final
        x = self.final_norm(x)

        # Predição sobre todo o vocabulário
        logits = self.output_head(x)

        return logits