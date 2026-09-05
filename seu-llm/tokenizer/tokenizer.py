import re


class Tokenizer:
    def __init__(self):
        # Tokens especiais
        self.special_tokens = {
            "<PAD>": 0,
            "<UNK>": 1,
            "<BOS>": 2,
            "<EOS>": 3,
            "<NL>": 4,
            "<INDENT>": 5,
            "<DEDENT>": 6,
        }

        self.token_to_id = dict(self.special_tokens)

        self.id_to_token = {
            token_id: token
            for token, token_id in self.token_to_id.items()
        }

    def build_vocabulary(self, texts):
        """
        Constrói o vocabulário a partir de textos e códigos.
        """

        for text in texts:
            tokens = self._split_text(text)

            for token in tokens:
                if token not in self.token_to_id:
                    token_id = len(self.token_to_id)

                    self.token_to_id[token] = token_id
                    self.id_to_token[token_id] = token

    def _tokenize_line(self, line):
        """
        Divide uma linha em palavras, números,
        operadores e símbolos.
        """

        pattern = r"""
            ==|!=|<=|>=|->|=>|//|\*\*|&&|\|\|
            |[^\W\d_]\w*
            |\d+(?:\.\d+)?
            |[^\w\s]
        """

        return re.findall(
            pattern,
            line,
            re.VERBOSE,
        )

    def _split_text(self, text):
        """
        Divide texto e código em tokens.

        Preserva:
        - palavras em Unicode
        - números
        - pontuação
        - operadores
        - símbolos
        - quebras de linha
        - indentação
        """

        tokens = []

        lines = text.splitlines()

        for line_index, line in enumerate(lines):
            stripped = line.lstrip(" ")

            indent_spaces = len(line) - len(stripped)

            indent_level = indent_spaces // 4

            if indent_level > 0:
                tokens.extend(
                    ["<INDENT>"] * indent_level
                )

            line_tokens = self._tokenize_line(
                stripped
            )

            tokens.extend(line_tokens)

            if line_index < len(lines) - 1:
                tokens.append("<NL>")

        return tokens

    def encode(
        self,
        text,
        add_bos=False,
        add_eos=False,
    ):
        """
        Converte texto ou código em IDs.
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
        Converte IDs novamente em texto ou código.
        """

        tokens = []

        for token_id in token_ids:
            token = self.id_to_token.get(
                token_id,
                "<UNK>",
            )

            tokens.append(token)

        resultado = ""
        indent_level = 0
        inicio_linha = True

        for token in tokens:
            if token == "<BOS>":
                continue

            if token == "<EOS>":
                break

            if token == "<NL>":
                resultado = resultado.rstrip()
                resultado += "\n"
                inicio_linha = True
                continue

            if token == "<INDENT>":
                indent_level += 1
                continue

            if token == "<DEDENT>":
                indent_level = max(
                    0,
                    indent_level - 1,
                )
                continue

            if inicio_linha:
                resultado += "    " * indent_level
                inicio_linha = False

            # Símbolos que não precisam de espaço antes.
            if token in {
                ",",
                ".",
                ";",
                ":",
                ")",
                "]",
                "}",
            }:
                resultado = resultado.rstrip()
                resultado += token

            # Símbolos de abertura.
            elif token in {
                "(",
                "[",
                "{",
            }:
                resultado = resultado.rstrip()
                resultado += token

            # Operadores.
            elif token in {
                "+",
                "-",
                "*",
                "/",
                "%",
                "=",
                "==",
                "!=",
                "<",
                ">",
                "<=",
                ">=",
                "->",
                "=>",
                "//",
                "**",
                "&&",
                "||",
            }:
                resultado = resultado.rstrip()
                resultado += " " + token + " "

            # Texto normal.
            else:
                if (
                    resultado
                    and not resultado.endswith(
                        (
                            " ",
                            "\n",
                            "(",
                            "[",
                            "{",
                        )
                    )
                ):
                    resultado += " "

                resultado += token

        return resultado.rstrip()

    def vocab_size(self):
        """
        Retorna o tamanho do vocabulário.
        """

        return len(self.token_to_id)