class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @task = Task.create(content: params[:content])
    render json: @task
  end

  def update
    @task.update(content: params[:content])
    render json: @task
  end

  def set_task
    @task = Task.find(params[:id])
  end
end
