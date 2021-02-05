#!/bin/bash
#set -e
###############################################################################
# Author	:	Erik Dubois
# Website	:	https://www.erikdubois.be
# Website	:	https://www.arcolinux.info
# Website	:	https://www.arcolinux.com
# Website	:	https://www.arcolinuxd.com
# Website	:	https://www.arcolinuxb.com
# Website	:	https://www.arcolinuxiso.com
# Website	:	https://www.arcolinuxforum.com
###############################################################################
#
#   DO NOT JUST RUN THIS. EXAMINE AND JUDGE. RUN AT YOUR OWN RISK.
#
###############################################################################


###############################################################################
#
#   DECLARATION OF FUNCTIONS
#
###############################################################################


func_install() {
	if pacman -Qi $1 &> /dev/null; then
		tput setaf 2
  		echo "###############################################################################"
  		echo "################## The package "$1" is already installed"
      	echo "###############################################################################"
      	echo
		tput sgr0
	else
    	tput setaf 3
    	echo "###############################################################################"
    	echo "##################  Installing package "  $1
    	echo "###############################################################################"
    	echo
    	tput sgr0
    	sudo pacman -S --noconfirm --needed $1
    fi
}

###############################################################################
echo "Installation of the core software"
###############################################################################

list=(
lightdm
lightdm-gtk-greeter
lightdm-gtk-greeter-settings
thunar
thunar-archive-plugin
thunar-volman
i3-gaps
i3status
dmenu
lxsession
lxterminal
nitrogen
nvidia-lts
nvidia-utils
nvidia-settings
)

count=0

for name in "${list[@]}" ; do
	count=$[count+1]
	tput setaf 3;echo "Installing package nr.  "$count " " $name;tput sgr0;
	func_install $name
done

###############################################################################

tput setaf 5;echo "################################################################"
echo "Enabling lightdm as display manager"
echo "################################################################"
echo;tput sgr0
sudo systemctl enable lightdm.service -f

tput setaf 7;echo "################################################################"
echo "You now have a very minimal functional desktop"
echo "################################################################"
echo;tput sgr0

sudo mkdir -p /usr/share/backgrounds
sudo cp $HOME/images/wallpapers/greeter* /usr/share/backgrounds/

tput setaf 11;
echo "################################################################"
echo "Reboot your system"
echo "################################################################"
echo;tput sgr0
