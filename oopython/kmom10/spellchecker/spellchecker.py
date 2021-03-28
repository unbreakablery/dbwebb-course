"""
Spellcheck Class
"""
import os.path
from menu import Menu
from trie import Trie
from exception import FileNotExist, SearchMiss

class Spellchecker:
    '''Implemente Spellchecker Class'''
    def __init__(self):
        '''Initialize spellchecker'''
        self.trie = Trie()
        self.menu = Menu()

    def load_file(self, filename):
        '''Load file from input filename'''
        if os.path.isfile(filename):
            self.initial_trie(filename)
            print("\nChoosed source file for dictionary!\nSo you can use the following command lines.")
        else:
            raise FileNotExist(filename)
        return True

    def initial_trie(self, filename):
        '''Initialize trie from file'''
        f = open(filename, "r")
        lines = f.readlines()
        f.close()
        print("Loading words from file...")
        print("It might take a few seconds...")
        del self.trie
        self.trie = Trie()
        for line in lines:
            self.trie.add_word(line.strip())
        print("Finished loading!")

    def print_all_words(self, order='asc'):
        '''Print all words in dictionary with option - asc/desc'''
        words = self.trie.get_all_words(order)
        for word in words:
            print(word)

    def add(self, word):
        '''add new word in dictionary'''
        self.trie.add_word(word.lower())
        return True

    def search(self, word):
        '''Check if your word is in the dictionary (Trie object)'''
        try:
            if self.trie.search(word.lower()):
                print("{} is spelled correctly!".format(word))
            return True
        except SearchMiss as e:
            e.print_error()
            return False

    def search_prefix(self, prefix, count=10):
        '''Get words with prefix'''
        words = self.trie.start_with_pre(prefix)
        if len(words) > count:
            return words[1:count]
        return words

    def print_words_prefix(self, prefix, count=10):
        '''Print words with prefix'''
        words = self.search_prefix(prefix, count)
        for word in words:
            print(word)

    def delete(self, word):
        '''Delete your word'''
        return self.trie.delete(word)

    def choice0(self, filename):
        '''loading file when running'''
        try:
            if self.load_file(filename):
                pass
            return True
        except FileNotExist as e:
            e.print_error()
            return False

    def choice2(self, param):
        '''Function for choice = 2'''
        if len(param) == 3:
            prefix = param
            self.print_words_prefix(prefix, 10)

            while True:
                param = input("Enter another letter or quit to exit: " + prefix)
                if param == 'quit':
                    break
                if len(param) > 1:
                    print("Enter another letter or quit to exit: " + prefix)
                else:
                    prefix += param
                    self.print_words_prefix(prefix, 10)
            return True
        if param == 'quit':
            return False
        return True

    def choice4(self, param):
        '''Function for choice = 4'''
        if param == 'asc':
            self.print_all_words('asc')
        elif param == 'desc':
            self.print_all_words('desc')
        else:
            print("This command has only 'asc' or 'desc' option.")

    def choice5(self, param):
        '''Funcion for choice = 5'''
        if self.delete(param.lower()):
            print("{} was deleted correctly!".format(param))
        else:
            print("{} was not in dictionary!".format(param))

    def main(self):
        '''Command Loop'''
        while True:
            print("=" * 60)
            print("NOTE: Frist, you must choose dictionary file to enter all words in Trie.")
            filename = input("Please enter your filename('tiny_dictionary.txt' or 'dictionary.txt')--> ")
            if self.choice0(filename):
                break

        while True:
            self.menu.show()
            choice = input("What to do?: ")
            if choice == '1':
                param = input("Enter word to check correct spelling: ")
                self.search(param)

            elif choice == '2':
                while True:
                    param = input("Enter 3 letters then one letter at the time or quit to exit: ")
                    if not self.choice2(param):
                        break

            elif choice == '3':
                filename = input("Please enter your filename(.txt) to replace: ")
                self.choice0(filename)

            elif choice == '4':
                param = input("Do you want to print with any option? (asc/desc) --> ")
                self.choice4(param)

            elif choice == '5':
                param = input("Enter word to delete: ")
                self.choice5(param)

            elif choice == "q":
                break
            else:
                print("That is not a valid choice. You can only choose from the menu.")

            input("\nPress enter to continue...")
        print("\nThank you and welcome back!\n")

if __name__ == "__main__":
    sc = Spellchecker()
    sc.main()
