class Tokenizer:
    def __init__(self):
        # Tokens especiais
        self.special_tokens = {
            "<PAD>": 0,
            "<UNK>": 1,
            "<BOS>": 2,
            "<EOS>": 3,
        }

        self.token_to_id = dict(self.special_tokens)

        self.id_to_token = {
            token_id: token
            for token, token_id in self.token_to_id.items()
        }

    def build_vocabulary(self, texts):
        """
        Constrói o vocabulário a partir de uma lista de textos.
        """

        for text in texts:
            tokens = self._split_text(text)

            for token in tokens:
                if token not in self.token_to_id:
                    token_id = len(self.token_to_id)

                    self.token_to_id[token] = token_id
                    self.id_to_token[token_id] = token

    def _split_text(self, text):
        """
        Divide o texto em tokens básicos.
        """

        return text.lower().split()

    def encode(
        self,
        text,
        add_bos=False,
        add_eos=False,
    ):
        """
        Converte texto em IDs.
        """

        tokens = self._split_text(text)

        token_ids = []

        if add_bos:
            token_ids.append(
                self.token_to_id["<BOS>"]
            )

        for token in tokens:
            token_id = self.token_to_id.get(
                token,
                self.token_to_id["<UNK>"],
            )

            token_ids.append(token_id)

        if add_eos:
            token_ids.append(
                self.token_to_id["<EOS>"]
            )

        return token_ids

    def decode(self, token_ids):
        """
        Converte IDs novamente em texto.
        """

        tokens = []

        for token_id in token_ids:
            token = self.id_to_token.get(
                token_id,
                "<UNK>",
            )

            tokens.append(token)

        return " ".join(tokens)

    def vocab_size(self):
        """
        Retorna o tamanho do vocabulário.
        """

        return len(self.token_to_id)