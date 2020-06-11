import { User } from '~/app/user/user.model';

export class Post {
    private url = 'http://192.168.0.103:3000/uploads/';

    // #############################################

    constructor(public id: string, public name: string, public photo: string, public user?: User) {
        const isFullPhotoPath = this.photo.indexOf(this.url);

        if (isFullPhotoPath === -1) {
            this.photo = `${this.url}${this.photo}`;
        }
    }

    // #############################################
}
