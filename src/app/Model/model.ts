export class Employee{
    id: number;
    name: string;
    designation: string;
    salary: number;
    state: string;
    pincode: number;
    address: string;

    constructor(){
        this.id = 0;
        this.name = '';
        this.designation = '';
        this.salary = 0;
        this.state = '';
        this.pincode = 0;
        this.address = '';
    }
}