"""
Trie implementation
"""
from exception import SearchMiss
from node import TrieNode

class Trie:
    """Implemente Trie Class"""
    def __init__(self):
        """init trie"""
        self.root = TrieNode("")
        self.output = []

    def add_word(self, word):
        """
        Function for adding word
        """
        node = self.root
        for char in word:
            if char in node.children:
                node = node.children[char]
            else:
                new_node = TrieNode(char)
                node.children[char] = new_node
                node = new_node
        node.is_end = True
        return True

    def dfs(self, node, pre):
        """
        Function for performing a DFS search
        """
        if node.is_end:
            self.output.append((pre + node.char))
        for child in node.children.values():
            self.dfs(child, pre + node.char)

    def start_with_pre(self, x=''):
        """
        Function for auto complete with prefix
        """
        node = self.root
        for char in x:
            if char in node.children:
                node = node.children[char]
            else:
                return []
        self.output = []
        self.dfs(node, x[:-1])
        self.output.sort()
        return self.output

    def search(self, x):
        """
        Function for searching word
        """
        node = self.root
        for char in x:
            if char in node.children:
                node = node.children[char]
            else:
                raise SearchMiss(x)
        if node.is_end:
            return True
        raise SearchMiss(x)

    def delete(self, x):
        """
        Function for deleting word
        """
        node = self.root
        parent = self.root
        char = ''
        for char in x:
            if char in node.children:
                parent = node
                node = node.children[char]
            else:
                return False
        if not node.children:
            del parent.children[char]
            del node
            return True
        node.is_end = False
        return True

    def get_all_words(self, order='asc'):
        """
        Function for getting all words from trie in order option(asc/desc)
        """
        words = self.start_with_pre()
        if order == 'asc':
            words.sort()
        else:
            words.sort(reverse=True)
        return words
