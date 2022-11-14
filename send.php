<?php

$phone = $_POST['phone'];
$email = $_POST['email'];
$sex = $_POST['sex'];
$age = $_POST['age'];

$to = "kokurinmaksim1@gmail.com";
$subject ='Отправлена заявка с сайта Test_Task';
$message = "Заявка была отправлена пользоваталем с имейлом $email номером телефона $phone  пол $sex";
$headers = "From: $phone <$email>" . "\r\n";

if (mail($to,$subject,$message,$headers)) {
	echo 'Ваше сообщение успешно отправлено (ответ сервера)!';
} else {
	echo 'Возникла ошибка при отработке функции mail на сервере (ответ сервера)!';
}

