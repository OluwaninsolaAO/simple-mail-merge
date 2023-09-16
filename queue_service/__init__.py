#!/usr/bin/env python3
"""A simple Celery Task Queue Service"""
from celery import Celery


class CeleryAbstraction(Celery):

    def get_inspector(self):
        """Return an instance of Celery inspector"""
        return self.control.inspect()

    def jobs(self):
        """Returns a list of active jobs in queue"""
        pass

    def completed(self):
        """Returns a list of completed jobs in queue"""
        pass

    def get_job(self, job_id: str = None):
        """Returns a job object in exchange for a job_id or 
        None if there are no jobs with a matching job_id"""
        pass

    def get_job_status(self, job_id: str = None):
        """Returns the status of a job with a matching job_id or None"""
        pass

    def successful(self, job_id: str = None) -> bool:
        """Returns a success state of a job with a matching job_id or None"""
        pass


app = CeleryAbstraction('smm_queue')
app.config_from_object('celeryconfig')
