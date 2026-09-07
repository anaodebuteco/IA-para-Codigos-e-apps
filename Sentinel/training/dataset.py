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

        self.sequences = []

        for text in texts:

            token_ids = tokenizer.encode(
                text,
                add_bos=True,
                add_eos=True,
            )

            if len(token_ids) <= sequence_length:
                continue

            for inicio in range(
                0,
                len(token_ids) - sequence_length,
            ):

                fim = inicio + sequence_length

                input_ids = token_ids[
                    inicio:fim
                ]

                target_ids = token_ids[
                    inicio + 1:fim + 1
                ]

                self.sequences.append(
                    (
                        torch.tensor(
                            input_ids,
                            dtype=torch.long,
                        ),
                        torch.tensor(
                            target_ids,
                            dtype=torch.long,
                        ),
                    )
                )

    def __len__(self):

        return len(self.sequences)

    def __getitem__(self, index):

        input_ids, target_ids = self.sequences[index]

        return input_ids, target_ids