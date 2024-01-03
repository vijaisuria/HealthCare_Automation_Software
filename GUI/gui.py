import tkinter as tk
import subprocess

# Function to start the server
def start_server():
    try:
        # Change the directory to the server location
        server_dir = 'C:\\Users\\2021503568\\Desktop\\MIT-HC\\server'
        subprocess.Popen(['npm', 'start'], cwd=server_dir)
        server_status.config(text="Server is running", fg="green")
        terminate_server_button.config(state=tk.NORMAL)  # Enable terminate server button
    except Exception as e:
        server_status.config(text="Error: Server couldn't start", fg="red")

# Function to stop the server
def stop_server():
    try:
        subprocess.Popen(['taskkill', '/F', '/IM', 'node.exe'], shell=True)
        server_status.config(text="Server is not active", fg="red")
        terminate_server_button.config(state=tk.DISABLED)  # Disable terminate server button
    except Exception as e:
        server_status.config(text="Error: Server couldn't be stopped", fg="red")

# Function to start the client
def start_client():
    try:
        # Change the directory to the client location
        client_dir = 'C:\\Users\\2021503568\\Desktop\\MIT-HC\\client'
        subprocess.Popen(['npm', 'start'], cwd=client_dir)
        client_status.config(text="Client is running", fg="green")
        terminate_client_button.config(state=tk.NORMAL)  # Enable terminate client button
    except Exception as e:
        client_status.config(text="Error: Client couldn't start", fg="red")

# Function to stop the client
def stop_client():
    try:
        subprocess.Popen(['taskkill', '/F', '/IM', 'node.exe'], shell=True)
        client_status.config(text="Client is not active", fg="red")
        terminate_client_button.config(state=tk.DISABLED)  # Disable terminate client button
    except Exception as e:
        client_status.config(text="Error: Client couldn't be stopped", fg="red")

# Create the main window
root = tk.Tk()
root.title("Healthcare Automation Software")
root.geometry("800x600")  # Set the initial window size
icon_path = "medicine.ico"  # Replace with the path to your ICO file
root.iconbitmap(default=icon_path)
# Set background color for the header
header_bg_color = "#007ACC"

# Create header with application logo, title, and text
header_frame = tk.Frame(root, bg=header_bg_color)
header_frame.pack(fill=tk.X)

# Load the AU logo image
au_logo_image = tk.PhotoImage(file="au.png")

# Calculate the desired width and height for the logo while maintaining the aspect ratio
desired_width = 100
aspect_ratio = au_logo_image.width() / au_logo_image.height()
desired_height = int(desired_width / aspect_ratio)

# Resize the logo using the subsample method to fit it into the specified dimensions
au_logo_image = au_logo_image.subsample(round(au_logo_image.width() / desired_width), round(au_logo_image.height() / desired_height))

# Create a label for the AU logo
au_logo_label = tk.Label(header_frame, image=au_logo_image, bg=header_bg_color)
au_logo_label.pack(side=tk.LEFT, padx=10, pady=10)

# Add title and text in the middle of the header
header_text = tk.Label(header_frame, text="HEALTHCARE AUTOMATION SOFTWARE \n\n MIT CAMPUS, ANNA UNIVERSITY", font=("Arial", 16, "bold"), fg="white", bg=header_bg_color)
header_text.pack(side=tk.LEFT, padx=10, pady=10, fill=tk.X, expand=True)

# Load and resize the right logo (MIT logo)
mit_logo_image = tk.PhotoImage(file="mit.png")
desired_width = 100
aspect_ratio = mit_logo_image.width() / mit_logo_image.height()
desired_height = int(desired_width / aspect_ratio)

mit_logo_image = mit_logo_image.subsample(round(mit_logo_image.width() / desired_width), round(mit_logo_image.height() / desired_height)) # Adjust the subsample value as needed


mit_logo_label = tk.Label(header_frame, image=mit_logo_image, bg=header_bg_color)
mit_logo_label.pack(side=tk.RIGHT, padx=10, pady=10)

header_space_frame = tk.Frame(root, height=40, bg="white")
header_space_frame.pack()

# Create Activate Server and Terminate Server buttons
server_frame = tk.Frame(root)
server_frame.pack(pady=10)


activate_server_button = tk.Button(server_frame, text="Activate Server", command=start_server)
activate_server_button.pack(side=tk.LEFT, padx=10)
terminate_server_button = tk.Button(server_frame, text="Terminate Server", command=stop_server, state=tk.DISABLED)
terminate_server_button.pack(side=tk.LEFT, padx=10)

# Create Activate Client and Terminate Client buttons
client_frame = tk.Frame(root)
client_frame.pack(pady=10)

activate_client_button = tk.Button(client_frame, text="Activate Client", command=start_client)
activate_client_button.pack(side=tk.LEFT, padx=10)
terminate_client_button = tk.Button(client_frame, text="Terminate Client", command=stop_client, state=tk.DISABLED)
terminate_client_button.pack(side=tk.LEFT, padx=10)

# Create a label to display the server status
server_status = tk.Label(root, text="Server is not active", fg="red")
server_status.pack()

# Create a label to display the client status
client_status = tk.Label(root, text="Client is not active", fg="red")
client_status.pack()

# Create Quit button to close the application
quit_button = tk.Button(root, text="Quit", command=root.quit)
quit_button.pack(pady=10)

footer_frame = tk.Frame(root, bg="white")
footer_frame.pack(side="bottom")  # Place the footer at the bottom of the window

admin_text = tk.Label(footer_frame, text="Administrator: Dr. V. P. Jayachitra \n", font=("Arial", 10), fg="black", bg="white")
admin_text.grid(row=0, column=0, padx=10, pady=(0, 5), sticky="w")


developer_text = tk.Label(footer_frame, text="Developer: Vijai Suria M (2021503568)", font=("Arial", 10), fg="black", bg="white")
developer_text.grid(row=2, column=0, padx=10, pady=(0, 5), sticky="w")

# Center-align contents vertically and horizontally
footer_frame.grid_rowconfigure(0, weight=1)
footer_frame.grid_columnconfigure(0, weight=1)

root.mainloop()
