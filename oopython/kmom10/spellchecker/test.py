"""
Tests Trie
"""
#pylint: disable=no-name-in-module,import-error
from spellchecker import Spellchecker
import unittest
from node import TrieNode
from trie import Trie

class TestTrie(unittest.TestCase):
    """Submodule for unittests, derives from unittest.TestCase"""

    def setUp(self):
        """ Setup test """
        self.trie = Trie()

    def tearDown(self):
        """ teardown test """
        self.trie = None

    def test_trie_init(self):
        """TestTrie that init works as expected"""
        self.trie.root = TrieNode("")
        self.assertEqual(self.trie.root.char, "")
        self.assertEqual(self.trie.root.is_end, False)
        self.assertEqual(self.trie.root.children, {})

    def test_trie_empty(self):
        """TestTrie that get_all_words return [] when trie is empty"""
        self.assertListEqual(self.trie.get_all_words(), [])

    def test_trie_not_empty(self):
        """TestTrie that get_all_words eosen't return [] when trie is not empty"""
        self.trie.add_word("Hello")
        self.assertGreater(len(self.trie.get_all_words()), 0)
    
    def test_trie_add_word(self):
        """TestTrie that word add in dictionary"""
        self.trie.add_word("Hello")
        self.assertTrue(self.trie.add_word("Hello"))

    def test_trie_search_true(self):
        """TestTrie that search return True when word is in dictionary"""
        self.trie.add_word("Hello")
        self.assertTrue(self.trie.search("Hello"))

    def test_trie_search_false(self):
        """TestTrie that search return False when word is not in dictionary"""
        self.assertFalse(self.trie.search("Hello"))

    def test_trie_delete_true(self):
        """TestTrie that delete return True when word is in dictionary and deleted"""
        self.trie.add_word("Hello")
        self.assertTrue(self.trie.delete("Hello"))

    def test_trie_delete_false(self):
        """TestTrie that delete return False when word is not in dictionary"""
        self.assertFalse(self.trie.delete("Hello"))
    
    def test_trie_get_all_words_sort(self):
        """TestTrie get all words sorted"""
        self.trie.add_word("apple")
        self.trie.add_word("pear")
        self.trie.add_word("orange")
        self.assertListEqual(self.trie.get_all_words('asc'), ['apple','orange','pear'])
        self.assertListEqual(self.trie.get_all_words('desc'), ['pear','orange','apple'])

    def test_trie_search_miss_raise(self):
        """TestTrie raise exception when word is not in dictionary"""
        with self.assertRaises (ValueError) as _:
            self.trie.search("Hello")

class TestSpellchecker(unittest.TestCase):
    """Submodule for unittests, derives from unittest.TestCase"""

    def setUp(self):
        """ Setup test """
        self.spellchecker = Spellchecker()

    def tearDown(self):
        """ teardown test """
        self.spellchecker = None

    def test_spellchecker_init(self):
        """TestSpellchecker that init works as expected"""
        self.spellchecker.trie = Trie()
        self.assertEqual(self.spellchecker.trie.root.char, "")
        self.assertEqual(self.spellchecker.trie.root.is_end, False)
        self.assertEqual(self.spellchecker.trie.root.children, {})

    def test_spellchecker_load_file_true(self):
        """TestSpellchecker that file exists"""
        self.assertTrue(self.spellchecker.load_file("tiny_dictionary.txt"))
    
    def test_spellchecker_file_not_exist(self):
        """TestSpellchecker that raise file not exist exception"""
        with self.assertRaises (ValueError) as _:
            self.spellchecker.load_file("myfile.txt")
    
    def test_spellchecker_search_true(self):
        """TestSpellchecker that word is spelled correctly"""
        self.spellchecker.add("Hello")
        self.assertTrue(self.spellchecker.search("Hello"))
    
    def test_spellchecker_search_prefix(self):
        """TestSpellchecker return word list that has prefix"""
        self.spellchecker.add("trie")
        self.spellchecker.add("trienode")
        self.assertListEqual(self.spellchecker.search_prefix("tri"), ['trie', 'trienode'])
    
    def test_spellchecker_change_dictionary(self):
        """TestSpellchecker that change dictionary"""
        self.assertTrue(self.spellchecker.load_file("tiny_dictionary.txt"))

if __name__ == '__main__':
    unittest.main()