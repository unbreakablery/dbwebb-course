# define Python user-defined exceptions
class Error(Exception):
    """Base class for other exceptions"""
    pass

class FileNotExist(Error):
    """Raised when the file for dictionary doesn't exist"""
    MESSAGE = "FileNotExist: File for dictionary doesn't exist."
           
    @staticmethod
    def printError():
        print(FileNotExist.MESSAGE)

class SearchMiss(Error):
    """Raised when the input word is not in dictionary"""
    @staticmethod
    def printError(word):
        print("SearchMiss: {} is NOT spelled correctly!".format(word))