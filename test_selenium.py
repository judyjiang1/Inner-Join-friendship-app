import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from chromedriver_py import binary_path
from selenium.webdriver.common.by import By
import time
   

# End-to-end testing 

class TestApp(unittest.TestCase):


    def setUp(self):
        # service_object = Service("/Users/judyjiang/Development/chromedriver-mac-arm64/chromedriver")
        service_object = Service(binary_path)
        self.driver = webdriver.Chrome(service=service_object)

    def tearDown(self):
        self.driver.quit()


    def test_landing_page(self):
        self.driver.get('http://localhost:5000/')
        time.sleep(8)
        landing_heading = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/div[1]/h2').text
        self.assertEqual(landing_heading, 'An innovative way of making new friends.')


    def test_login_and_access_all_protected_pages(self):
        
        # Check login
        self.driver.get('http://localhost:5000/login')
        email_input = self.driver.find_element(By.NAME, 'email')
        password_input = self.driver.find_element(By.NAME, 'password')
        login_button = self.driver.find_element(By.CLASS_NAME, 'login-button')
        email_input.send_keys('testuser@test.com')
        password_input.send_keys('testtesttest')
        login_button.click()
        time.sleep(5)

        # Check redirect to My Groups Page after login 
        my_group_page = self.driver.find_element(By.TAG_NAME, 'h1').text
        self.assertEqual(my_group_page, 'My Groups')

        
        # Check Chat Room page 
        chat_card = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[1]/div/div[2]/img')
        chat_card.click()
        time.sleep(5)
        chat_input = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/div[2]/div[2]/form/input')
        chat_input.send_keys('test')
        send_btn = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[2]/div/div[2]/div[2]/form/button')
        send_btn.click()
        time.sleep(3)
        last_msg_sent_xpath = "(//div[starts-with(@id, 'message-')])[last()]"
        sent_message = self.driver.find_element(By.XPATH, last_msg_sent_xpath).text
        self.assertIn('test', sent_message)


        # Check Leave chat button and redirect to My Groups page
        leave_btn = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/button[1]')
        leave_btn.click()
        time.sleep(5)
        yes_btn = self.driver.find_element(By.XPATH,'/html/body/div[3]/div/div[6]/button[1]')
        yes_btn.click()
        time.sleep(3)
        my_group_page = self.driver.find_element(By.TAG_NAME, 'h1').text
        self.assertEqual(my_group_page, 'My Groups')

        # Check My Super Match Page
        super_match_btn = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/div/span[2]/a' )
        super_match_btn.click()
        time.sleep(10)
        super_match_heading = self.driver.find_element(By.TAG_NAME, 'h2').text
        self.assertEqual(super_match_heading, 'My Super Match')
    
        # Check logout and redirect to landing page
        logout_btn = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/nav/div/span[4]/a')
        logout_btn.click()
        time.sleep(3)
        landing_heading = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/div[1]/h2').text
        self.assertEqual(landing_heading, 'An innovative way of making new friends.')



if __name__ == '__main__':
    unittest.main()