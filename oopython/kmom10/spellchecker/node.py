"""
Trie Node Implementation
"""
class TrieNode:
    def __init__(self, char):
        self.char = char
        self.is_end = False
        self.children = {}