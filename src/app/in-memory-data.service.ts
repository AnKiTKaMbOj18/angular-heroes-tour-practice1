import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{
    createDb() {
        const heroes = [
            {id:1,name:"amrit"},
            {id:2,name:"ritu"},
            {id:3,name:"merry"},
            {id:4,name:"ivan"},
            {id:5,name:"serit"},
            {id:6,name:"wamrit"},
            {id:7,name:"kamrit"},
            {id:8,name:"yamrit"},
            {id:9,name:"pamrit"},
            {id:10,name:"qamrit"},
        ];
        return {heroes};
    }    
}