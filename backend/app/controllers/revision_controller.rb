# class RevisionsController < ApplicationController
#   before_action :set_press_release

#   def index
#     @revisions = @press_release.revisions
#   end

#   def create
#     @revision = @press_release.revisions.new(revision_params)
#     if @revision.save
#       redirect_to @press_release, notice: "Revision created."
#     else
#       redirect_to @press_release, alert: "Failed to create revision."
#     end
#   end

#   private

#   def set_press_release
#     @press_release = PressRelease.find(params[:press_release_id])
#   end

#   def revision_params
#     params.require(:revision).permit(:content, :version)
#   end
# end
