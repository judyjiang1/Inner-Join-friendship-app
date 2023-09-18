from . import socketio, login_check
from flask_socketio import emit
from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from model import db, User, ChatRoom, Message, RoomMember, get_utc_timestamp
from flask import g
from datetime import datetime, timezone


@socketio.on('joined', namespace='/chat/')
@login_check
def joined():
    """Sent by clients when they enter a room.
    A status message is broadcasted to all people in the room."""

    room_obj: ChatRoom = g.room
    user_obj: User = g.user
    member_info = RoomMember.ensure_membership(room_id=room_obj.id, user_id=user_obj.user_id)

    join_room(room_obj.id)
    print(
        f'Enter [{room_obj.id}-{room_obj.category_name}-{room_obj.group_name}], {user_obj.user_id}-{user_obj.fname}-{user_obj.lname}')
    emit(
        'status',
        {
            'code': 3,
            'kind': 'on-entrance',
            'msg': f'{g.user.username} entered this chat',
            'user': member_info
        },
        room=room_obj.id
    )


@socketio.on('text', namespace='/chat/')
@login_check
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room_obj: ChatRoom = g.room
    user_obj: User = g.user
    content = message.get('content')

    m = Message()
    m.room_id = room_obj.id
    m.content = content
    m.sender_id = user_obj.user_id
    db.session.add(m)
    db.session.commit()
    RoomMember.update_last_speak(room_id=room_obj.id, member_id=user_obj.user_id)
    print(
        f'Text [{room_obj.id}-{room_obj.category_name}-{room_obj.group_name}], {user_obj.user_id}-{user_obj.fname}-{user_obj.lname}')
    print(content)
    emit(
        'message',
        {
            'code': 1,
            'kind': 'on-message',
            'msg': dict(
                message_id=m.id,
                room_id=m.room_id,
                content=content,
                created_at=get_utc_timestamp(),
                sender_id=user_obj.user_id,
                sender_fname=user_obj.fname,
                sender_lname=user_obj.lname,
                sender_email=user_obj.email)
        },
        room=room_obj.id)


@socketio.on('left', namespace='/chat/')
@login_check
def left():
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room_obj: ChatRoom = g.room
    room_id = g.room.id
    user_obj: User = g.user

    leave_room(room_id)
    RoomMember.update_online_status(room_id=room_id, member_id=user_obj.user_id, status=False)
    
    emit(
        'status',
        {
            'code': 2,
            'kind': 'on-left',
            'msg': f'{g.user.username} left room',
            'user_id': user_obj.user_id
        },
        room=room_id
    )