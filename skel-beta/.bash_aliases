#
# ~/.bashrc
#

# collection of personal aliases

alias eb='nano $HOME/.bashrc'
alias eba='nano $HOME/.bash_aliases'

#readable output
alias df='df -h'

#merge new settings
alias merge="xrdb -merge ~/.Xresources"
alias exr="nano $HOME/.Xresources"

#hardware info --short
alias hw="hwinfo --short"

#youtube-dl
alias yta-aac="youtube-dl --extract-audio --audio-format aac "
alias yta-best="youtube-dl --extract-audio --audio-format best "
alias yta-flac="youtube-dl --extract-audio --audio-format flac "
alias yta-m4a="youtube-dl --extract-audio --audio-format m4a "
alias yta-mp3="youtube-dl --extract-audio --audio-format mp3 "
alias yta-opus="youtube-dl --extract-audio --audio-format opus "
alias yta-vorbis="youtube-dl --extract-audio --audio-format vorbis "
alias yta-wav="youtube-dl --extract-audio --audio-format wav "

alias ytv-best="youtube-dl -f bestvideo+bestaudio "

#Update packages
alias upall='sudo pacman -Syyu'

#Cleanup orphaned packages
alias cleanup='sudo pacman -Rns $(pacman -Qtdq)'
#alias cleanup='sudo apt autoclean && sudo apt autoremove'

#shutdown or reboot
alias ssn="sudo shutdown now"
alias sr="sudo reboot"


alias dots='cd $HOME/git/fitzland/arch-dots'

alias jrnl='cd $HOME/Dropbox/journal'

alias ei3='code $HOME/.config/i3/config'
alias skelbin='meld $HOME/.bin /etc/skel/.bin'
alias skelxr='meld $HOME/.Xresources /etc/skel/.Xresources'
alias skelocal='meld $HOME/.local /etc/skel/.local'
alias skelcfg='meld $HOME/.config /etc/skel/.config'
alias skelgit='meld $HOME/git/fitzland/arco-dots/ $HOME/git/dubois/arco-i3/'
#alias skelbspwm='meld $HOME/.config/bspwm /etc/skel/.config/bspwm'
alias skeli3='meld $HOME/.config/i3 /etc/skel/.config/i3'

alias chface='cp $HOME/.face-bak .face'alias config='/usr/bin/git --git-dir=/home/jeff/.dots/ --work-tree=/home/jeff'

alias mcserver='ssh jeff@192.168.1.127'

screenfetch