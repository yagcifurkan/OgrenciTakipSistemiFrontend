import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Message } from '../models/message';
import { MessageDetail } from '../models/messageDetail';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiControllerURL = `${environment.apiURL}/Messages`;

  constructor(private httpClient: HttpClient) {}

  add(message: Message): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      message
    );
  }

  update(message: Message): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      message
    );
  }

  delete(message: Message): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      message
    );
  }

  getMessages(): Observable<ListResponseModel<Message>> {
    return this.httpClient.get<ListResponseModel<Message>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getMessageById(messageId: number): Observable<SingleResponseModel<Message>> {
    return this.httpClient.get<SingleResponseModel<Message>>(
      `${this.apiControllerURL}/getbyid?id=${messageId}`
    );
  }

  getMessageDetailsByReceiverUserId(receiverUserId: number): Observable<ListResponseModel<MessageDetail>> {
    return this.httpClient.get<ListResponseModel<MessageDetail>>(
      `${this.apiControllerURL}/getmessagedetailsbyreceiveruserid?receiveruserid=${receiverUserId}`
    );
  }
}
