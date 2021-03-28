"""Module exception"""

class FileNotExist(Exception):
    """Raised error file not exists"""
    def __init__(self, filename):
        """init exception"""
        self.filename = filename
        super().__init__(filename)

    def print_error(self):
        """Print Error"""
        print("FileNotExist: File - '{}' for dictionary doesn't exist.".format(self.filename))

class SearchMiss(Exception):
    """Raised when the input word is not in dictionary"""
    def __init__(self, word):
        """Raised when the input word is not in dictionary"""
        self.word = word
        super().__init__(word)

    def print_error(self):
        """Print Error"""
        print("SearchMiss: '{}' is NOT spelled correctly!".format(self.word))
