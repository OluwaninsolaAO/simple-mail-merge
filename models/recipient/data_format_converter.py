#!/usr/bin/env python3
"""
DataFormatConverter Module containing helper methods
needed to parse a CSV or JSON string to a Python Dict
"""
from typing import List
import csv
import json
from json.decoder import JSONDecodeError


class DataFormatConverter:
    """Data Format Converter Utility Class"""

    @staticmethod
    def csv_to_list(data: str) -> List[dict]:
        """
        Converts CSV string to its equivallent Python
        List of Dictionaries
        """

        data_list = list(csv.reader(data.splitlines()))
        header = data_list.pop(0)

        objects = []
        for data in data_list:
            object = {}
            for key, value in zip(header, data):
                object.update({key: value})
            objects.append(object)
        return objects

    @staticmethod
    def json_to_list(data: str) -> List[dict]:
        """
        Converts JSON string to its equivallent Python
        List of Dictionaries
        """
        try:
            data_list = json.loads(data)
        except JSONDecodeError as exc:
            raise ValueError(str(exc))
        if not isinstance(data_list, list):
            raise ValueError('Expects {} got {}'.format(
                list.__name__, type(data_list).__name__
            ))
        return data_list or []

    @staticmethod
    def data_to_list(data: str) -> List[dict]:
        """
        Converts JSON or CSV string to its equivallent Python
        List of Dictionaries 
        """
        pass
