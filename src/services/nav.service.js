import { Subject } from 'rxjs';

const subject = new Subject();

export const navService = {
    toggleNav: bool => subject.next({ active: bool }),
    getNav: () => subject.asObservable(),
    getUser: () => subject.asObservable(),
    setUser: user => subject.next({ user: user }),
};
