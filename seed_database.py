"""Script to seed database."""

import os
import json

import crud
import model
import server

from datetime import datetime



def calculate_age(birthdate):
    birthdate = datetime.strptime(birthdate, '%m/%d/%Y')
    today = datetime.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


if __name__ == "__main__":
    from server import app
    os.system("dropdb friends")
    os.system("createdb friends")

    with app.app_context():
        model.connect_to_db(server.app)
        model.db.create_all()
 
        with open("data/user_data.json", "r") as f:
            user_data = json.loads(f.read())
        
        with open("data/category_data.json", "r") as c:
            category_data = json.loads(c.read())


#######################################################################################################################

        # to create mock users
        users_in_db = []
        for user in user_data:
            username, email, password, fname, lname, gender, ethnicity, occupation, zipcode = (
                user["username"],
                user["email"],
                user["password"],
                user["first_name"],
                user["last_name"],
                user["gender"],
                user["ethnicity"],
                user["occupation"],
                user["zip_code"]
            )
            
            age = calculate_age(user["birthdate"])
            db_user = model.User.create(username,email,password,fname,lname,gender,age,ethnicity, occupation, zipcode)

            # if len(user["hobby"]) > 0:
            #     tag1 = model.UserTag(user_id=model.User.user_id,category_tag_id=1)
            #     db_user.category_tags.append(tag1)
            
            users_in_db.append(db_user)
        
        model.db.session.add_all(users_in_db)
        model.db.session.commit()


#############################################################################################################################################################

        # Create category tags
        
        all_categories = []

        def extract_categories(obj):
            if isinstance(obj, dict):
                for category in obj:
                    all_categories.append(category)
                    extract_categories(obj[category])
            elif isinstance(obj, list):
                for item in obj:
                    extract_categories(item)

        # call the function
        extract_categories(category_data)
        # print(all_categories)

        category_tags_in_db = []

        for tag in all_categories:
            img = f"/static/img/{tag}.jpg"           
            db_category = model.Category_tag.create(img_url=img, category_tag_name=tag)
            category_tags_in_db.append(db_category)
            
        model.db.session.add_all(category_tags_in_db)
        model.db.session.commit()


#############################################################################################################################################################

        # create groups

        group_list = []

        for key in category_data:
            group_list.extend([value.capitalize() for value in category_data[key]])

        # print(group_list)

        groups_in_db = []

        for group in group_list:
            group_name = group
            db_group = model.Group.create(group_name)
            groups_in_db.append(db_group)
            
        model.db.session.add_all(groups_in_db)
        model.db.session.commit()


#############################################################################################################################################################

        # seed UserTag association table data

        users = crud.all_users()
       
        tags = crud.all_category_tags()
          
        groups = crud.all_groups()

        category_mapping = {"hobbies & interests": 1,"cultural background": 2,"support groups": 3,"current or past workplace(s)": 4,"current or past college(s) attended": 5,"current or past high school(s) attended": 6}

        for user in user_data:
            user_id = user["id"]
            
            for category, category_tag_id in category_mapping.items():
                if len(user[category]) > 0:
                    user_tag = model.UserTag(user_id=user_id, category_tag_id=category_tag_id)
                    model.db.session.add(user_tag)
                    model.db.session.commit()

        # for user in user_data:
        #     user_id = user["id"]
        #     if len(user["hobby"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=1)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        #     if len(user["cultural_background"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=2)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        #     if len(user["support"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=3)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        #     if len(user["company"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=4)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        #     if len(user["college"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=5)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        #     if len(user["high_school"]) > 0:
        #         user_tag = model.UserTag(user_id=user_id, category_tag_id=6)
        #         model.db.session.add(user_tag)
        #         model.db.session.commit()
        

#############################################################################################################################################################

        # seed UserGroup association table data

        
        

        for user in user_data:
            user_id = user["id"]
            user_combined_list = []  

            for category_name in ["hobbies & interests", "cultural background", "support groups",
                                "current or past workplace(s)", "current or past college(s) attended",
                                "current or past high school(s) attended"]:
                group_name = user.get(category_name)
                if isinstance(group_name, str):
                    user_combined_list.append(group_name)
                elif isinstance(group_name, list):
                    user_combined_list.extend(group_name)

            
            for item in user_combined_list:
                item = item.capitalize()
                print(item)
                group = model.Group.query.filter_by(group_name=item).first()
                print(group)
                if group:
                    group_id = group.group_id
                    user_group = model.UserGroup(user_id=user_id, group_id=group_id)
                    model.db.session.add(user_group)
                    model.db.session.commit()

    

#############################################################################################################################################################

        # seed GroupTag association table data
              
        category_tag_id = 1

        for category, items in category_data.items():
            for item in items:
                item = item.capitalize()
                # print(item)
                group = model.Group.query.filter_by(group_name=item).first()
                if group:
                    group_id = group.group_id
                    group_tag = model.GroupTag(category_tag_id=category_tag_id, group_id=group_id)
                    model.db.session.add(group_tag)
                    model.db.session.commit()
            category_tag_id += 1

        # for category, items in category_data.items():
        #     category_tag_id = category_mapping.get(category)
        #     if category_tag_id is not None:
        #         for item in items:
        #             item = item.capitalize()
        #             group = model.Group.query.filter_by(group_name=item).first()
        #             if group:
        #                 group_id = group.group_id
        #                 group_tag = model.GroupTag(category_tag_id=category_tag_id, group_id=group_id)
        #                 model.db_session.add(group_tag)
        #                 model.db_session.commit()



        
        
          

        



