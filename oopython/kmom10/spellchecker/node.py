"""
Trie Node Implementation
"""
class TrieNode:
    """Trie Node memeber char"""
    def __init__(self, char):
        self.char = char
        self.is_end = False
        self.children = {}
