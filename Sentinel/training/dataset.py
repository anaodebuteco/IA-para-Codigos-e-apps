import torch
from torch.utils.data import Dataset

from tokenizer.tokenizer import Tokenizer


class TextDataset(Dataset):
    def __init__(
        self,
        texts,
        tokenizer: Tokenizer,
        sequence_length: int,
    ):
        self.tokenizer = tokenizer
        self.sequence_length = sequence_length

        # Junta todos os textos em uma única sequência de tokens.
        token_ids = []

        for text in texts:
            ids = tokenizer.encode(
                text,
                add_bos=True,
                add_eos=True,
            )

            token_ids.extend(ids)

        self.token_ids = torch.tensor(
            token_ids,
            dtype=torch.long,
        )

    def __len__(self):
        """
        Retorna quantas sequências de treinamento
        podem ser criadas.
        """

        return max(
            0,
            len(self.token_ids) - self.sequence_length,
        )

    def __getitem__(self, index):
        """
        Retorna:

        entrada:
            tokens atuais

        alvo:
            próximo token de cada posição
        """

        inicio = index
        fim = index + self.sequence_length

        input_ids = self.token_ids[
            inicio:fim
        ]

        target_ids = self.token_ids[
            inicio + 1:fim + 1
        ]

        return input_ids, target_ids