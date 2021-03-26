"""
Spellcheck Class
"""
import os.path
from menu import Menu
from trie import Trie
from exception import FileNotExist

class Spellchecker:
    def __init__(self):
        self.trie = Trie()
        self.menu = Menu()

    def load_file(self, filename):
        try:
            if os.path.isfile(filename):
                self.initial_trie(filename)
                print("\nChoosed source file for dictionary!\nSo you can use the following command lines.")
                return True
            else:
                raise FileNotExist
        except FileNotExist:
            FileNotExist.printError()
            return False

    def print_all_words(self, order = 'asc'):
        '''Print all words in dictionary with option - asc/desc'''
        words = self.trie.get_all_words(order)
        for word in words:
            print(word)

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
            # for word in line.strip().split(" "):
            #     if word != "":
            #         self.trie.add_word(word)
            self.trie.add_word(line.strip())
        print("Finished loading!")
    
    def add(self, word):
        '''add new word in dictionary'''
        if self.search(word) == False:
            return self.trie.add_word(word)
        else:
            return False

    def search(self, word):
        '''Check if your word is in the dictionary (Trie object)'''
        return self.trie.search(word)
        
    def search_prefix(self, prefix, count = 10):
        '''Get words with prefix'''
        words = self.trie.start_with_pre(prefix)
        if len(words) > count:
            return words[1:count]
        else:
            return words

    def print_words_prefix(self, prefix, count = 10):
        '''Print words with prefix'''
        words = self.search_prefix(prefix, count)
        for word in words:
            print(word)

    def delete(self, word):
        '''Delete your word'''
        return self.trie.delete(word)

    def main(self):
        '''Command Loop'''
        
        while True:
            print("=" * 60)
            print("NOTE: Frist, you must choose dictionary file to enter all words in Trie.")
            filename = input("Please enter your filename('tiny_dictionary.txt' or 'dictionary.txt')--> ")
            if self.load_file(filename) == True:
                break

        while True:
            self.menu.show()
            choice = input("What to do?: ")
            if choice == '1':
                param = input("Enter word to check correct spelling: ")
                if self.search(param.lower()) == True:
                    print("{} is spelled correctly!".format(param))
                
            elif choice == '2':
                while True:
                    param = input("Enter 3 letters then one letter at the time or quit to exit: ")
                    if len(param) == 3:
                        prefix = param
                        self.print_words_prefix(prefix, 10)

                        while True:
                            param = input("Enter another letter or quit to exit: " + prefix)
                            if param == 'quit':
                                break
                            elif len(param) > 1:
                                print("Enter another letter or quit to exit: " + prefix)
                            else:
                                prefix += param
                                self.print_words_prefix(prefix, 10)
                                
                    elif param == 'quit':
                        break
                
            elif choice == '3':
                filename = input("Please enter your filename(.txt) to replace: ")
                self.load_file(filename)
                    
            elif choice == '4':
                param = input("Do you want to print with any option? (asc/desc) --> ")
                if (param == 'asc'):
                    self.print_all_words('asc')
                elif param == 'desc':
                    self.print_all_words('desc')
                else:
                    print("This command has only 'asc' or 'desc' option.")

            elif choice == '5':
                param = input("Enter word to delete: ")
                if self.delete(param.lower()) == True:
                    print("{} was deleted correctly!".format(param))
                else:
                    print("{} was in dictionary!".format(param))

            elif choice == "q":
                break
            else:
                print("That is not a valid choice. You can only choose from the menu.")

            input("\nPress enter to continue...")
        print("\nThank you and welcome back!\n")

if __name__ == "__main__":
    sc = Spellchecker()
    sc.main()