from . import socketio, login_check
from flask_socketio import emit
from flask_socketio import SocketIO, emit, join_room

from model import db, User, ChatRoom, Message, RoomMember, get_utc_timestamp


@socketio.on('joined', namespace='/chat/')
@login_check
def joined(message):
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


