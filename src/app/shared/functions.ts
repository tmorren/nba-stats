import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class Functions {

    // Sort an array by the given sortBy
    static sort(array, sortBy){
        const original = array.slice();
        array.sort(this.dynamicSort(sortBy));

        if(this.arraysAreIdentical(original, array, sortBy)){
            array.reverse();
        }
        return array;
    }

    // Sorts the numeric value of each given property
    static dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            return b[property]['#text'] - a[property]['#text'];
        }
    }

    static arraysAreIdentical(arr1, arr2, property){
        if (arr1.length !== arr2.length) return false;
        for (var i = 0, len = arr1.length; i < len; i++){
            if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true; 
    }

    static getTodaysDateString(){
        var dateObj = new Date();
        let month: any = dateObj.getMonth() + 1; //months from 1-12
        let day: any = dateObj.getDate();
        let year: any = dateObj.getFullYear();
      
        if(month < 10) {
            month = "0" + String(month);
        }

        if(day < 10) {
            day = "0" + String(day);
        }
        const date = String(year) + String(month) + String(day);

        return date;
    }

    static getYesterdaysDateString(){
        var dateObj = new Date();
        dateObj.setDate(dateObj.getDate()-1);
        let month: any = dateObj.getMonth() + 1; //months from 1-12
        let day: any = dateObj.getDate();
        let year: any = dateObj.getFullYear();
      
        if(month < 10) {
            month = "0" + String(month);
        }

        if(day < 10) {
            day = "0" + String(day);
        }
    
        const date = String(year) + String(month) + String(day);

        return date;
    }

    static sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    
}