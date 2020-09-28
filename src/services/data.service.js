import { Subject } from 'rxjs';

const subject = new Subject();

export const dataService = {
    loading: bool => subject.next(bool),
    isLoading: () => subject.asObservable()
};
