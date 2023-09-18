from flask_socketio import SocketIO, emit
from flask import session, g
from model import User
from model import ChatRoom
from functools import wraps

socketio = SocketIO(
    async_mode='threading',
    # transports=['websocket']
)


def login_check(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        room = args[0].get('room')
        if room is None:
            return emit('status', {'code': -1, 'msg': 'room id missing', 'room': room})

        room_obj: ChatRoom = ChatRoom.query.filter(ChatRoom.id == room).first()
        g.room = room_obj
        if room_obj is None:
            return emit('status', {'code': -1, 'msg': 'room does not exist', 'room': room})

        user_id = session.get('user_id')
        if user_id:
            user_obj: User = User.query.filter(User.user_id == user_id).first()
            if user_obj is None:
                return emit('status', {'code': -1, 'msg': 'invalid user', 'room': room})
            else:
                pass
            g.user = user_obj
        return f(*args, **kwargs)

    return wrapper


from . import events
