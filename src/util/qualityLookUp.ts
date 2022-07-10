export const getQuality = (read: any): number => {

    const numRead = Number(read);

    if(isNaN(numRead)) {
        return 6;
    }

    if(numRead < 51) {
        return 1;
    }
    if(numRead < 101) {
        return 2;
    }
    if(numRead < 151) {
        return 3;
    }
    if(numRead < 201) {
        return 4;
    }
    if(numRead < 301) {
        return 5;
    }

    return 6;

}