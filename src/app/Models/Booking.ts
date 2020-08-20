import {Room} from './Room';

export class Booking{
    id?: number;
    room?: Room;
    memberEmail?: string;
    roomID: number;
    from: string;
    to: string;
    description?: string;
}
