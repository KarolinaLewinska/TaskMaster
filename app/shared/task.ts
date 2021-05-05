import { IonDatetime } from "@ionic/angular";

export interface Task {
    deadline: Date;
    title: string;
    description: string;
    category: string;
    priority: string;
}