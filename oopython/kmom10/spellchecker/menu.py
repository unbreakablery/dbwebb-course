
"""Menu class for Spellchecker"""
class Menu:
    """Class menu"""
    def __init__(self):
        """Menu Image"""
        self.title = r"""
===========================================================
   _____            ____     __              __
  / ___/____  ___  / / /____/ /_  ___  _____/ /_____  _____
  \__ \/ __ \/ _ \/ / / ___/ __ \/ _ \/ ___/ //_/ _ \/ ___/
 ___/ / /_/ /  __/ / / /__/ / / /  __/ /__/ ,< /  __/ /
/____/ .___/\___/_/_/\___/_/ /_/\___/\___/_/|_|\___/_/
    /_/
===========================================================
        """

    def get_title(self):
        """ get title """
        return self.title

    def show(self):
        """function spellchecker menu list"""
        # print(chr(27) + "[2J" + chr(27) + "[;H")
        print(self.get_title())
        print("------------------------ Menu ----------------------------")
        print("1. Check a word")
        print("2. Get word suggestion")
        print("3. Change dictionary")
        print("4. Print all words")
        print("5. Delete word")
        print("q. Exit")
        print("----------------------------------------------------------")
